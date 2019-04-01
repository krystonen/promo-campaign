export default function (input) {
    let code = input.toString();

    if (code.length === 0) {
        return error("Enter your promo code:");
    } 

    if (code.length !== 9) {
        return error("The code should contain 9 digits.");
    }

    let divisableByEleven = () => {
        const array = code.split('').map((i) => { return parseInt(i, 10) });
        const total = array.map((n,a) => n * (array.length - a)).reduce((sum, i) => sum + i );
        return (total%11 !== 0);
    }; 
  
    if (code.match(/([0-9])\1\1/) !== null) {
        return error("The code has 3 or more of the same digits");
    } else if (divisableByEleven()){ 
        return error("Your code is invalid")
    } else {
        return ok();
    }
}

function error(message) {
    return { valid: false, error: message };
}

function ok() {
    return { valid: true };
}
