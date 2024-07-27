import React, { useState } from "react";
import { useAppContext } from "../../app-context";
import "./styles.css";
import ButtonCustom from "../button-custom";
import InputText from "../input-text";
import { FILTERS_TYPE } from "../../app-contants";

const WagesFilter = ({
    onApplyClick = () => {}
}) => {
  const { theme } = useAppContext();
  const [wageValue, setWageValue] = useState("");

  return (
    <div className="filterModal">
        <div className="filterModalContent">
            <h1>Wage Filter</h1>
            <p>Minimum Wage</p>
            <div>
                <InputText
                    type="number"
                    value={wageValue}
                    placeholder={"Enter minimum wage"}
                    onChangeHandler={(e) => setWageValue(e.target.value)}
                />
            </div>
            <ButtonCustom text="Apply" onClick={() => onApplyClick(FILTERS_TYPE.WAGE,wageValue)} />
        </div>
    </div>
  );
};

export default WagesFilter;
