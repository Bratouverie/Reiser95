export const roundInt = ({ num }) => {
    const roundedString = num.toFixed(4);
    const rounded = Number(roundedString);

    return rounded;
};
