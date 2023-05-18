# 📝My Motoko List 📲dApp


## Additional feactures ✨:

* I have added the "markAsPending" method in the backend to allow you to define whether a task is complete or incomplete by simply tapping it.
* I have also performed timestamp conversions so that you can add a deadline to your tasks.
* I have created a decentralized application (DApp) that I designed with my own use in mind, with a simple and minimalist design. I have tried to make it as intuitive as possible, even with responsive capability for phones.

## How it works:

* Refresh: This option updates the task list in case there is any issue.
* Manage: When selecting this option, you will be redirected to a task management menu where you can perform the following functionalities:
* Add: It allows you to add a task with its title, description, and deadline.
* Edit: It allows you to modify an existing task using its identification (ID). You will be able to edit the title, description, and date.
* Delete: It allows you to delete a task based on its identification (ID). Please note that this action will be performed immediately and there will be no confirmation button.
Change task status: By tapping the tasks, you can change their status from pending to completed.
* Search: At the top, you have the option to search within the tasks using text,<b>the search works with precise words, is sensitive to upper case and lower case!</b>

⚠️ Limitations: It is important to note that the DApp may experience some slowness. To ensure proper functionality, I have implemented alerts that indicate each user action. You can also check this in the console. Don't despair when using the DApp, it works as it should. Another limitation is that it would have been beneficial to implement the use of accounts so that each user has their own tasks, but I don't know how to do it, <b>the search works with precise words, is sensitive to upper case and lower case!</b>

//--------------------------------------------------------------------

## Default README.MD

Welcome to your new motokolistdapp project and to the internet computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with motokolistdapp, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/quickstart/hello10mins)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/references/motoko-ref/)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.icp0.io)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd motokolistdapp/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
