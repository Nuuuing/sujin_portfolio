import logo from 'src/assets/img/logo.png';

export const MainSplash = () => {

    return (
        <>
            <section style={{display: "flex", justifyContent:"center", marginTop: "2rem"}}>
                <img src={logo} style={{ width: "50%" }} />
            </section>
        </>
    )
}