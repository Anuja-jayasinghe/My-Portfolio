"use client";


    useEffect(() => {
        const handleScroll = () => {
            const sections = items.map(item => item.href.substring(1));
            const scrollPosition = window.scrollY + 100;

            let foundSection = null;
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        foundSection = section;
                        break;
                    }
                }
            }
            setActiveSection(foundSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Update indicator position when active section changes
    useEffect(() => {
        if (!navRef.current || !indicatorRef.current) return;
        
        const activeItem = navRef.current.querySelector(`[data-section="${activeSection}"]`);
        if (activeItem) {
            const { offsetLeft, offsetWidth } = activeItem;
            indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
            indicatorRef.current.style.width = `${offsetWidth}px`;
        } else {
            indicatorRef.current.style.width = `0px`;
        }
    }, [activeSection]);

    // Focus management for mobile menu
    useEffect(() => {
        if (isMobileMenuOpen && mobileNavRef.current) {
            const focusableElements = mobileNavRef.current.querySelectorAll('a[href], button');
            const firstElement = focusableElements[0];
            firstElement?.focus();

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    setIsMobileMenuOpen(false);
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isMobileMenuOpen]);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetId = href.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(targetId);
            setIsMobileMenuOpen(false);
        }
    };

    return (

