import logo from 'src/assets/img/logo.png';
import styled from 'styled-components';

export const MainSplash = () => {

    return (
        <>
            <StyledContents>
                <div> 
                    <div style={{width: "100%", justifyContent: 'center', display:'flex'}}>
                        <img src={logo} alt="logo" style={{ width: "80%", display: "block"}} />
                    </div>
                    <p>
                        's DEV PORTFOLIO
                    </p>
                </div>
            </StyledContents>
        </>
    )
}

const StyledContents = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 8rem 0px;
    text-align: center;
`