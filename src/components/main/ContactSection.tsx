'use client'

export const ContactSection = () => {
    return (
        <>
            <div
                className="mb-[6rem] w-[18rem]">
                <h1
                    className="text-3xl font-bold"> CONTACT</h1>
            </div>
            <div
                className="mt-[4rem] pb-[6rem] text-left ml-[1rem]">
                <div
                    className="mb-[4rem]">
                    <div className="flex w-[10rem]">
                        <div style={{ borderBottom: '1px #bdbdbd solid', width: '70%' }}></div>
                        <p style={{ width: '30%', fontSize: "0.72rem" }}>DEVELOPER</p>
                    </div>
                    <p className="font-bold text-xl">김 수 진 • KIM SUJIN</p>
                    <p className="font-light text-[0.85rem]">웹 • 응용프로그램 • 게임 개발</p>
                </div>
                <div className="text-[0.9rem]">
                    <a
                        className="group block flex items-center gap-2 hover:text-[#949494] w-[13rem] duration-150"
                        href="mailto:su_042@daum.net"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-[1.2rem] h-[1.2rem] fill-current"
                        >
                            <path d="M2 4C1.447 4 1 4.447 1 5V19C1 19.553 1.447 20 2 20H22C22.553 20 23 19.553 23 19V5C23 4.447 22.553 4 22 4H2zM2 6L12 13L22 6V8L12 15L2 8V6Z" />
                        </svg>
                        <p className="group-hover:text-[#949494] duration-150 ">su_042@daum.net</p>
                    </a>
                </div>

                <div className="mt-[0.4rem] text-[0.9rem]">
                    <a
                        href="https://github.com/Nuuuing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block flex items-center gap-2 w-[10rem] hover:text-[#949494] transition-colors duration-150"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-[1.2rem] h-[1.2rem] fill-current"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.04c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.11-.775.418-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.47-2.38 1.236-3.22-.125-.304-.535-1.527.115-3.18 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.655 1.653.245 2.876.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.62-5.475 5.92.43.37.81 1.096.81 2.21v3.27c0 .32.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
                            />
                        </svg>
                        <p className="text-inherit">GITHUB</p>
                    </a>
                </div>

                <div className="mt-[0.4rem] text-[0.9rem]">
                    <a
                        className="group block flex items-center gap-2 w-[10rem] hover:text-[#949494] duration-150"
                        href="https://nuu-stradamus.tistory.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-[1.2rem] h-[1.2rem] fill-current"
                        >
                            <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" />
                        </svg>
                        <p className="group-hover:text-[#949494] duration-150 ">BLOG</p>
                    </a>
                </div>
            </div>
        </>
    )
}