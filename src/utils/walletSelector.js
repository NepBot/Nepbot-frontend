import { setupWalletSelector } from "@near-wallet-selector/core";
// import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { setupModal } from "@near-wallet-selector/modal-ui-js";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import {getConfig} from "../config";
const config = getConfig()

export default class WalletSelector {
    selector = {}
    modal = {}

    constructor(selector, modal) {
        this.selector = selector
        this.modal = modal
    }

    static async new(options) {
        const selector = await setupWalletSelector({
            network: config.networkId,
            modules: [
              //...(await setupDefaultWallets()),
              setupNearWallet(options),
              //setupMyNearWallet(),
              //setupSender(),
              //setupHereWallet(),
            ],
        });
          
        const modal = setupModal(selector, {
            theme: "dark",
            contractId: config.RULE_CONTRACT
        });
        return new WalletSelector(selector, modal)
    }
}
