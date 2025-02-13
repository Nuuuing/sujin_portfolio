import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";

export const Spinner = () => {
    const text = "SUJIN'S PORTFOLIO";
    const characters = text.split("");

    const radius = 80;
    const fontSize = "18px";
    const letterSpacing = 12.5;

    const [scope, animate] = useAnimate();

    useEffect(() => {
        const animateLoader = async () => {
            const letterAnimation: any[] = [];
            characters.forEach((_, i) => {
                letterAnimation.push([
                    `.letter-${i}`,
                    { opacity: 0 },
                    { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" }
                ]);
            });
            characters.forEach((_, i) => {
                letterAnimation.push([
                    `.letter-${i}`,
                    { opacity: 1 },
                    { duration: 0.3, at: i === 0 ? "+0.8" : "-0.28" }
                ]);
            });
            animate(letterAnimation, {
                ease: "linear",
                repeat: Infinity
            });
            animate(
                scope.current,
                { rotate: 360 },
                { duration: 4, ease: "linear", repeat: Infinity }
            );
        };
        animateLoader();
    }, []);

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <motion.div
                ref={scope}
                className="circle"
                style={{
                    width: radius * 2,
                    height: radius * 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}
            >
                <p aria-label={text} />
                <p aria-hidden="true" className="text">
                    {characters.map((ch, i) => (
                        <motion.span
                            key={i}
                            className={`letter letter-${i}`}
                            style={{
                                transformOrigin: `0 ${radius}px`,
                                transform: `rotate(${i * letterSpacing}deg)`,
                                fontSize
                            }}
                        >
                            {ch}
                        </motion.span>
                    ))}
                </p>
            </motion.div>
        </div>
    );
}
