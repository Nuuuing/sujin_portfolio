interface MenuProps {
    onMenuClick: (section: 'PROJECT' | 'CAREER' | 'CONTACT') => void;
}

export const Menu = (props: MenuProps) => {
    const { onMenuClick } = props;
    return (
        <div>
            <MenuButton
                menuTxt={'PROJECT'}
                onClick={() => onMenuClick('PROJECT')}
            />
            <MenuButton
                menuTxt={'CAREER'}
                onClick={() => onMenuClick('CAREER')}
            />
            <MenuButton
                menuTxt={'CONTACT'}
                onClick={() => onMenuClick('CONTACT')}
            />
        </div>
    )
}

interface MenuButtonProps {
    menuTxt: string;
    onClick: () => void;
}
const MenuButton = (props: MenuButtonProps) => {
    const { menuTxt, onClick } = props;
    return (
        <p
            onClick={onClick}
            style={{
                margin: '10px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                fontWeight: 800
            }}>
            {menuTxt}
        </p>
    )
}