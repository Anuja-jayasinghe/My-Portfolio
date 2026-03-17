import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const username = 'Anuja-jayasinghe';

    if (!GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GITHUB_TOKEN_NOT_FOUND' }, { status: 500 });
    }

    const query = `
        query($username: String!) {
            user(login: $username) {
                contributionsCollection {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                                contributionLevel
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
            },
            body: JSON.stringify({
                query,
                variables: { username }
            }),
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.errors) {
            console.error('GitHub GraphQL Errors:', data.errors);
            return NextResponse.json({ error: 'GRAPHQL_ERROR', details: data.errors }, { status: 500 });
        }

        const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;
        
        // Flatten the weeks into a single array of days
        const flattenedDays = weeks.flatMap((week: any) => 
            week.contributionDays.map((day: any) => ({
                date: day.date,
                count: day.contributionCount,
                level: day.contributionLevel
            }))
        );

        return NextResponse.json(flattenedDays);
    } catch (error: any) {
        console.error('GitHub Uplink Error:', error);
        return NextResponse.json({ error: 'UPLINK_INTERNAL_ERROR', message: error.message }, { status: 500 });
    }
}
