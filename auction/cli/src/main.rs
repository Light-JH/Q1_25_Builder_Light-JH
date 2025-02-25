use std::path::PathBuf;

use clap::{Parser, Subcommand};
use solana_client::rpc_client::RpcClient;
use solana_sdk::signer::keypair::read_keypair_file;

mod idl;

#[derive(Parser)]
#[command(name = "auction-cli")]
#[command(about = " CLI for interacting with the Solana Aucton program")]
struct Cli {
    /// Path to keypair file used for signing
    #[arg(short, long, value_name = "PATH")]
    keypair_path: Option<PathBuf>,
    #[command(subcommand)]
    command: Command,
}

#[derive(Subcommand)]
enum Command {
    InitHouse {
        fee: u16,
        name: String,
    },

    InitAuction {
        starting_price: u64,
        end_slot: u64,
        amount: u64,
        decimal: u8,
    },

    Bid {
        price: u64,
        decimal: u8,
    },

    Withdraw,
    Finalize,
}

fn main() {
    let cli = Cli::parse();
    let rpc_url = "http://127.0.0.1:8899";
    let _client = RpcClient::new(rpc_url);
    let _keypair = read_keypair_file("dev-wallet.json").expect("Couldn't find wallet file");

    match cli.command {
        Command::InitHouse { fee, name } => {
            println!("Initializing house with fee: {} and name: {}", fee, name);
        }

        Command::InitAuction {
            starting_price,
            end_slot,
            amount,
            decimal,
        } => {
            println!(
                "Initializing auction with starting price: {}, end slot: {}, amount: {}, decimal: {}",
                starting_price, end_slot, amount, decimal);
        }

        Command::Bid { price, decimal } => {
            println!("Placing bid with price: {} (decimal={})", price, decimal)
        }

        Command::Withdraw => {
            println!("Withdraw funds")
        }

        Command::Finalize => {
            println!("Finalizing Auction")
        }
    }
}
