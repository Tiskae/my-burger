import burgerLogo from "../../assets/images/logo.png";
import classes from "./Logo.module.css";

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={burgerLogo} alt="Burger Logo" />
        </div>
    );
};

export default logo;
