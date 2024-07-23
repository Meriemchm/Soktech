import React from "react";
import AddButton from "./AddButton";

const Inter = (props) => {
    const { button } = props;
    return (
        <div>
            {" "}
            <AddButton button={button} />
        </div>
    );
};

export default Inter;
