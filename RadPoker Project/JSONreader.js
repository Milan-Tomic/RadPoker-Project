
/**
 * Array of accounts.
 * 
 * { id, customer_id, address, city, state, zip_code, contest_id, rating,
 *   created_date }
 */
export let accounts = require('./Json_Files/accounts.json');

/**
 * Array of contests.
 * 
 * { id, name }
 */
export let contests = require('./Json_Files/contests.json');

/**
 * Array of customer profiles.
 * 
 * { first_name, last_name, email, active, account_manager_id,
 *   reason_for_joining, created_date }
 */
export let customers = require('./Json_Files/customers.json');

// Global lists of keys for the above files.
export let accountKeys = Object.keys(accounts[0]);
export let contestKeys = Object.keys(contests[0]);
export let customerKeys = Object.keys(customers[0]);

/**
 * Formats the accounts array.
 *
 * Currently unused.
 */
function formatAccounts() {
    
}

/**
 * Formats the contests array.
 * 
 * Currently unused.
 */
function formatContests() {

}

/**
 * Formats the customers array.
 * 
 * Alphabetises customers by first_name.
 */
function formatCustomers() {

    // Alphabetises the customer list.
    customers.sort(function (a, b) {
        if (a.first_name < b.first_name) return -1;
        else if (a.first_name > b.first_name) return 1;
        else return 0;

    });
}

/**
 * Formats all JSON files by calling all of the above format functions.
 * 
 * Alphabetises customers, does nothing else.
 */
export function formatFiles() {

    // Alphabetises customers.
    formatCustomers();

    // Formats accounts.
    formatAccounts();

    // Formats contests.
    formatContests();

}

/**
 * Fetches all items in a given JSON array where the value associated with the
 * inputed key matches the inputed value.
 */
export function getMatchingElems(arr, key, value) {
    let ret = [];

    // Finds and adds the matching elements.
    arr.forEach(elem => { if (elem[key] == value) ret.push(elem) });

    // Returns the list of matching elements.
    return ret;

}

/**
 * Fetches the number of items in a given JSON array where the value associated
 * with the inputed key matches the inputed value.
 */
export function getNumMatchingElems(arr, key, value) {
    let ret = 0;

    // Finds and the number of matching elements.
    arr.forEach(elem => { if (elem[key] == value) ++ret });

    // Returns the number of matching elements.
    return ret;

}