declare var require: any

// Modules.
let React = require('react');
let ReactDOM = require('react-dom');

// Header for reading the JSON files.
let reader = require('./JSONreader.js');

// Current customer.
let CUSTOMER;

/*
 * The screen for showing all contests. Allows navigation back to the
 * MainScreen.
 * 
 * Shows all key-value pairs in each contest as well as the calculated number
 * of participants in said contests.
 */
export class ContestsScreen extends React.Component {

    /**
     * Enters the ContestsScreen and renders.
     */
    static enter() {
        ReactDOM.render(<ContestsScreen/>, document.getElementById('root'));

    }

    /**
     * Shows all key-value pairs in each contest as well as the calculated number
     * of participants in said contests.
     */
    render() {
        return (
            <div>
                {/* Button for returning to the MainScreen. */}
                <div>
                    <button type="button" key={"MainScreen"} onClick={() => MainScreen.enter()} >
                        Show All Customers
                    </button>
                </div>
                <br></br>
                {/* Contests section. */}
                <div>
                    <header>
                        <b>Contests:</b>
                    </header>
                    <br></br>
                    {/* Writes all attributes of all contests. */}
                    <div>
                        {reader.contests.map(contest => (
                            <div>
                                {/* Writes the saved attributes of the current contest.. */}
                                <div>
                                    {reader.contestKeys.map(key => (
                                        <li key={key}>
                                            {key + ": " + contest[key]}
                                        </li>
                                    ))}
                                    {/* Writes the number of members of the current contest. */}
                                    <li>
                                        {"members: " + reader.getNumMatchingElems(reader.accounts, 'contest_id', contest.id)}
                                    </li>
                                </div>
                                <br></br>
                            </div>
                        ))}
                    </div>
                    <br></br>
                </div>
            </div>
        );
    }
}

/*
 * The screen for showing the data and accounts relating to any given Customer.
 * Allows navigation back to the MainScreen.
 * 
 * Shows all key-value pairs in the CUSTOMER as well as every key-value pair
 * in all of the CUSTOMER's accounts.
 */
export class CustomerScreen extends React.Component {

    /**
     * Enters the CustomerScreen of the inputed customer and renders.
     * 
     * @param customer the customer to be displayed.
     */
    static enter(customer) {

        // Changes the customer.
        CUSTOMER = customer;

        // Renders the Customer screen.
        ReactDOM.render(<CustomerScreen/>, document.getElementById('root'));

    }

    /**
     * Shows all key-value pairs in the CUSTOMER as well as every key-value
     * pair in all of the CUSTOMER's accounts.
     */
    render() {
        return (
            <div>
                {/* Button for returning to the MainScreen. */}
                <div>
                    <button type="button" key={"MainScreen"} onClick={() => MainScreen.enter()} >
                        Show All Customers
                    </button>
                </div>
                <br></br>
                {/* Customer section. */}
                <div>
                    <header>
                        <b>Customer:</b>
                    </header>
                    <br></br>
                    {/* Writes all attributes of the current CUSTOMER. */}
                    <div>
                        {reader.customerKeys.map(key => (
                            <li key={key}>
                                {key + ": " + CUSTOMER[key]}
                            </li>
                        ))}
                    </div>
                    <br></br>
                </div>
                {/* Accounts section. */}
                <div>
                    <header>
                        <b>Customer Accounts:</b>
                    </header>
                    <br></br>
                    {/* Creates a list of all accounts associated with the current CUSTOMER. */}
                    <div>
                        {reader.getMatchingElems(reader.accounts, 'customer_id', CUSTOMER['id']).map(account => (
                            <div>
                                { reader.accountKeys.map(key => (
                                    <li key={key}>
                                        {key + ": " + account[key]}
                                    </li>
                                ))}
                                <br></br>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

/*
 * The default screen which displays the list of all customers. Allows
 * navigation to any given CustomerScreen as well as the ContestsScreen.
 * 
 * Upon clicking the name of any customer their account information will be
 * displayed on their CustomerScreen.
 * 
 * Upon clicking the Constests button, the ContestsScreen will be displayed.
 */
export class MainScreen extends React.Component {

    /**
     * Enters the MainScreen and renders.
     */
    static enter() {
        ReactDOM.render(<MainScreen/>, document.getElementById('root'));

    }

    /**
     * Creates the ContestsScreen button and a list of buttons associated with
     * each customer.
     * 
     * The ContestsScreen button will take the user to the ContestsScreen, and
     * any customer's button will take the user to the associated
     * CustomerScreen.
     */
    render() {
        return (
            <div>
                {/* Button for entering the ContestsScreen. */}
                <div>
                    <button type="button" key={"ContestsScreen"}
                        onClick={() => ContestsScreen.enter()}>
                        Show Contests
                    </button>
                </div>
                <br></br>
                { /* Customer's section. */ }
                <div>
                    <header>
                        <b>Customers:</b>
                    </header>
                </div>
                <br></br>
                <div>
                    {/* Creates Buttons to take the user to each CustomerScreen. */}
                    <div>
                        {reader.customers.map(customer => (
                            <div key={customer.first_name}>
                                <button type="button" key={customer.first_name}
                                    onClick={() => CustomerScreen.enter(customer)}>
                                    {customer.first_name + " " + customer.last_name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * Main function for this app. Prepares the JSON files and enters the Main screen.
 */
function main() {

    // Formats the files.
    reader.formatFiles();

    // Opens the Main screen.
    ReactDOM.render(<MainScreen/>, document.getElementById('root'));

}
main();