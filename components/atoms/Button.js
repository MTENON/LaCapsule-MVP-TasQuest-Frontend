import styles from "../../styles/atoms/Button.module.css";
import { Icon } from "@iconify-icon/react";


function Button(props){
    // const buttonStyles = {
    //     primary: { backgroundColor: "#a50104", color: "#fcd757" },
    //     secondary: { backgroundColor: "#fcd757", color: "#a50104" },
    // };

/*LES ICONES

<Icon icon="tabler:calendar-check" />                = TODO 
<Icon icon="game-icons:shoulder-armor" />            = Icone de QUÊTE 
<Icon icon="ri:list-check-3" />                      = checking 
<Icon icon="game-icons:school-bag" />                = Equipement 
<Icon icon="ci:shopping-bag-02" />                   = SHOP
<Icon icon="fa6-regular:id-card" />                  = ID Card 
<Icon icon="game-icons:skills" />                    = Skills
<Icon icon="iconamoon:player-end-fill" />            = Boutton Play
<Icon icon="mingcute:cross-fill" />                  = Boutton Plus
<Icon icon="ph:pen" />                               = Boutton Stylo
<Icon icon="gravity-ui:plug-connection" />           = Boutton connexion
<Icon icon="icomoon-free:cross" />                   = Boutton croix pour annuler
*/
    let squareSsizeEmpty = props.squareSsizeEmpty;
    let squareMsize = props.squareMsize;
    let btnLarge = props.btnLarge;
    let btnDiamond = props.btnDiamond;
    let circleSsize = props.circleSsize;
    let circleMsize = props.circleMsize;
    let icon = "";

    let style = {
        height: "60px",
        width: "60px",
        borderRadius: "25px",
        cursor: "pointer",
        backgroundColor: "#A50104",
    }

    //===========================================>           <===========================================//
    //===========================================>  VARIANT  <===========================================//
    //===========================================>           <===========================================//
    if (squareSsizeEmpty === "squareSsizeEmptyRed")
        {
            style = {
                height: "44px",
                width: "44px",
                borderRadius: "15px",
                cursor: "pointer",
                border: "3px solid #A50104",
                backgroundColor: "transparent",
            }
        }

    else if (squareSsizeEmpty === "squareSsizeEmptyYellow")
        {

            style = {
                height: "44px",
                width: "44px",
                borderRadius: "15px",
                cursor: "pointer",
                border: "3px solid #FCD757",
                backgroundColor: "transparent",
            }
        }

    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//

    //===========================================>           <===========================================//
    //===========================================>  VARIANT  <===========================================//
    //===========================================>           <===========================================//

    if (squareMsize === "squareRed")
        {
            icon = <Icon icon="icomoon-free:cross" />
        }

    else if (squareMsize === "squareYellow")
        {
            icon = <Icon icon="icomoon-free:cross" />

            style = {
                height: "60px",
                width: "60px",
                borderRadius: "25px",
                cursor: "pointer",
                backgroundColor: "#FCD757",
            }
        }

    else if (squareMsize === "squareMsizeRedEmpty")
        {
            style = {
                height: "60px",
                width: "60px",
                borderRadius: "25px",
                cursor: "pointer",
                backgroundColor: "#A50104",
            }
        }
    
    else  (squareMsize === "squareMsizeYellowEmpty")
        {
            style = {
                    height: "60px",
                    width: "60px",
                    borderRadius: "25px",
                    cursor: "pointer",
                    backgroundColor: "#FCD757",
            }
        }
    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//


    //===========================================>           <===========================================//
    //===========================================>  VARIANT  <===========================================//
    //===========================================>           <===========================================//
     if (btnLarge === "btnLargeRed")   
        {
           
            style = {
                height: "57px",
                width: "129px",
                padding: "14px, 20px",
                borderRadius: "15px",
                gap: "10px",
                cursor: "pointer",
                backgroundColor: "#A50104",
            }
        }

     else (btnLarge === "btnLargeYellow")
        {
            style = {
                height: "57px",
                width: "129px",
                padding: "14px, 20px",
                borderRadius: "15px",
                gap: "10px",
                cursor: "pointer",
                backgroundColor: "#FCD757",
            }

        }   

    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//

    if (btnDiamond === "btnDiamondRed")
        {
            style = {
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                backgroundColor: "#A50104",
                transform: "rotate(45deg)",
            }
        }
    else (btnDiamond === "btnDiamondYellow")
        {
            style = {
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                backgroundColor: "#FCD757",
                transform: "rotate(45deg)",
            }
        }

    //===========================================>           <===========================================//
    //===========================================>  VARIANT  <===========================================//
    //===========================================>           <===========================================//

        if (circleSsize === "circleSsizeRed")
            {
                style = {
                    height: "30.44px",
                    width: "29.36px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    border: "3px solid #A50104",
                    backgroundColor: "transparent",
                }
            }
        
        else (circleSsize === "circleSsizeYellow")
            {
                style = {
                    height: "30.44px",
                    width: "29.36px",
                    borderRadius: "15px",
                    cursor: "pointer",
                    border: "3px solid #A50104",
                    backgroundColor: "transparent",
                }
            }


    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//

    //===========================================>           <===========================================//
    //===========================================>  VARIANT  <===========================================//
    //===========================================>           <===========================================//
    if (circleMsize === "circleMsizeRed")
        {
            style = {
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                backgroundColor: "#A50104",
            }
        }

    else if (circleMsize === "circleMsizeYellow")
        {
            style = {
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                backgroundColor: "#FCD757",
            }
        }
    
    else if (circleMsize === "circleMsizeRedEmpty")
        {
            style = {
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                border: "3px solid #A50104",
                backgroundColor: "transparent",
            }
        }

    else (circleMsize === "circleMsizeYellowEmpty")
        {
            style = {
                width: "50px",
                height: "50px",
                borderRadius: "50px",
                border: "3px solid #FCD757",
                backgroundColor: "transparent",
            }
        }

    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//
    //===========================================>   END     <===========================================//

    return (
        <>
        <button
            onClick={console.log('click')}
            style={style}
        >    Hello there    </button>
            {/* <span className="material-icons">face</span>
            <button className={styles.triangle}>P</button>
            <button className={styles.rectangleEmptyRed}>R</button>
            <button className={styles.btnLittleEmptyCircleRed}>ok</button>
            <button className={styles.btnRed}>A</button>
            <button className={styles.btnLittleSquareEmptyRed}>Rien</button>
            <button className={styles.btnSquareEmptyRed}>Wesh</button>
            <button className={styles.btnDiamondRed}>B</button>
            <button className={styles.btnEmptyCircleRed}></button>
            <button className={styles.btnCircleRed}>C</button>
            <button className={styles.btnLargeRed}>D</button>
            <button className={styles.btnYellow}>E</button>
            <button className={styles.btnSquareEmptyYellow}>Test</button>
            <button className={styles.btnLittleSquareEmptyYellow}>9</button>
            <button className={styles.btnDiamondYellow}>F</button>
            <button className={styles.btnCircleYellow}>G</button>
            <button className={styles.btnLargeYellow}>H</button> */}
            </>
    );
};

export default Button;
