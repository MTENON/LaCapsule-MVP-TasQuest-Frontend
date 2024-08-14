const BackgroundGrey = ({ width, height, children }) => {
    const style = {
        height,
        width,
        borderRadius: "20px",
        backgroundColor: "#F0EFEF",
        boxShadow: "4px 4px 4px 0px #00000040",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        overflowY: "auto",
        paddingTop: "20px",
    };

    return <div style={style}>{children}</div>;
};

export default BackgroundGrey;
