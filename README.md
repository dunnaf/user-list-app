# Users List App

[Homepage](https://ajaib-test-fawn.vercel.app/)

This page will display greetings from the developer, and a list of accessible pages.


[SSR Page](https://ajaib-test-fawn.vercel.app/ssr) 

This page will display a list of users in a paginated table, which is rendered SSR. You can find, sort, and filter data by using form or button which will be displayed, also all parameters will be shown in URL query and integrated, so you can also change data using URL query.


[CSR Page](https://ajaib-test-fawn.vercel.app/csr)

This page will display a list of users in a paginated table, which is CSR rendered. You can find, sort, and filter data by using the form or button which will be displayed, but the parameters will not be displayed in the URL query. User data pages that have been opened will be saved to the Redux Store, so there is no need to take the API again when you want to open previously opened pages.

## Installation

To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/dunnaf/ajaib-test.git

# Go into the repository
$ cd user-list-app

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Usage

```javascript
// Run in local
npm run dev

// Build the app
npm run build

// Run linter
npm run lint

// Run test
npm run test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
