interface MenuProps {
    onMenuClick: (section: 'PROJECT' | 'CAREER' | 'CONTACT') => void;
    active?: 'PROJECT' | 'CAREER' | 'CONTACT' | null;
}

export const Menu = (props: MenuProps) => {
    const { onMenuClick, active } = props;
    return (
        <div>
            <MenuButton
                menuTxt={'PROJECT'}
                isActive={active === 'PROJECT'}
                onClick={() => onMenuClick('PROJECT')}
            />
            <MenuButton
                menuTxt={'CAREER'}
                isActive={active === 'CAREER'}
                onClick={() => onMenuClick('CAREER')}
            />
            <MenuButton
                menuTxt={'CONTACT'}
                isActive={active === 'CONTACT'}
                onClick={() => onMenuClick('CONTACT')}
            />
        </div>
    )
}

interface MenuButtonProps {
    menuTxt: string;
    onClick: () => void;
    isActive?: boolean;
}
const MenuButton = (props: MenuButtonProps) => {
    const { menuTxt, onClick, isActive } = props;
    return (
        <p
            onClick={onClick}
            className={`m-2 cursor-pointer text-[1.1rem] font-extrabold transition-colors duration-200 
        ${isActive ? 'text-white' : 'text-[#525252] hover:text-[#ffffff]'}`}
        >
            {menuTxt}
        </p>
    )
}