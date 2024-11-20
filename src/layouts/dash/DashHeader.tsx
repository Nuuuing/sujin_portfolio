import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_MAIN } from "src/routes/const";

export const DashHeader = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleClickLogo = () => {
        navigate(ROUTE_MAIN);
    }

    const handleClickMenu = () => {
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <div className="header-div">
                <p className="logo" onClick={handleClickLogo}>SUJIN</p>
                <div />
                <div
                    style={{ width: "3rem", cursor: "pointer" , marginRight: "0.5rem"}}
                    onClick={() => handleClickMenu()}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "2rem" }}>
                        {menuOpen ? "close" : "menu"}
                    </span>
                </div>
            </div>
        </>
    )
}