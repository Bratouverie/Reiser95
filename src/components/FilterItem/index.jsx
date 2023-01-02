import React from 'react';

const FilterItem = ({title, value = "", elements}) => {
    const [open, setOpen] = React.useState(true);

    return (
        <div className="collection__filter--box--item">
            <div className="collection__filter--box--title" onClick={() => setOpen(prev => !prev)}>
                <p className="collection__filter--box--title--value">{title}</p>

                <div className="collection__filter--box--attrs">
                    {value && <p className="collection__filter--box--attr">{value}</p>}

                    <img
                        src="/assets/img/arrow-top.svg"
                        alt="arrow"
                        className={`collection__filter--box--attr--arrow${!open ? " active" : ""}`}
                    />
                </div>
            </div>

            {open && <div className="collection__filter--box--values">
                {elements.map((data, key) => (
                    <div className="collection__filter--box--value">
                        <input type="checkbox" className="checkbox" id={`${key}_${data.text}`} />

                        <label htmlFor={`${key}_${data.text}`} className="collection__filter--box--value--label">
                            {data.text}
                        </label>
                    </div>
                ))}
            </div>}
        </div>
    );
};

export default FilterItem;