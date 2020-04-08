import React, { useState, useEffect } from "react";

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);
    // use 'category => {' cause error
    const handleToggle = (category) => () => {
        // return the 1st index or -1
        const currentCategoryId = checked.indexOf(category);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state => push
        // else => pull/ take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(category);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log("Checkbox componet/newCheckedCategoryId", newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    };

    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input
                onChange={handleToggle(c._id)}
                // end of video 90 => should be alue={checked.indexOf(c._id)}
                value={checked.indexOf(c._id === -1)}
                type="checkbox"
                className="form-check-input"
            />
            <label className="form-check-label">{c.name}</label>
        </li>
    ));
};

export default Checkbox;
