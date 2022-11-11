import React, { useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {connect, WalletConnection, keyStores} from "near-api-js";
import WalletSelector from '../../utils/walletSelector';
import * as nearAPI from 'near-api-js';
import {getConfig} from "../../config";
import {Base64} from 'js-base64';
import qs from "qs";
import './Snapshot.css';
import load from '../../assets/images/load.gif';
import {sign} from "../../utils/util";
import { requestTransaction } from '../../utils/contract';
import {getSnapshotSign,sendmsgSnapshot} from "../../api/api";

const config = getConfig()

export default function Success(props) {
    const history = useHistory();
    useEffect(()=>{
        (async ()=>{
            const search =  qs.parse(props.location.search.slice(1));
            // const near = await connect(config);
            // const wallet = new WalletConnection(near, 'nepbot');
            // const account = wallet.account(); 
            const walletSelector = await WalletSelector.new({})
            if (!walletSelector.selector.isSignedIn()) {
                const selector = document.getElementById("near-wallet-selector-modal");
                walletSelector.modal.show();
                selector.getElementsByClassName('nws-modal-overlay')[0].style.display= 'none';
                selector.getElementsByClassName('close-button')[0].style.display= 'none';
                return
            }
            const wallet = await walletSelector.selector.wallet()
            const accountId = (await wallet.getAccounts())[0].accountId
            const privateKey = await walletSelector.getPrivateKey(accountId)
            const keyStore = new keyStores.InMemoryKeyStore();
            const near = await connect({
                keyStore,
                ...config,
            });
            const account = await near.account();

            const checkResult = async (result) => {
                const provider = new nearAPI.providers.JsonRpcProvider(config.nodeUrl)
                const txRes = search.transactionHashes ? await provider.txStatus(search.transactionHashes) : result;
                const res = await sendmsgSnapshot({
                    guild_id: search.guild_id,
                    channel_id:search.channel_id,
                    hash:Base64.decode(txRes.status.SuccessValue).replaceAll("\"",""),
                }) 
                if(res){
                    window.open('https://discord.com/channels/','_self')
                }else{
                    history.push({pathname: `/failure`})
                }
            }

            // !window.localStorage.getItem("isSender") && 
            if(search.transactionHashes){
                await checkResult('');
                return;
            }else{
                const args = {
                    user_id: search.user_id,
                    guild_id: search.guild_id,
                    contract_address: search.contract_address,
                    sign: search.sign
                }
                const signature = await sign(privateKey, args)
                const _sign = await getSnapshotSign({
                    args: args,
                    account_id: accountId,
                    sign: signature
                })
                if(!_sign) {
                    history.push({pathname: '/linkexpired', })
                    return
                }
                const res = await requestTransaction(
                    account,
                    config.SNAPSHOT_CONTRACT,
                    "set_snapshot",
                    {
                        contract_address: search.contract_address,
                        ..._sign
                    },
                    '300000000000000',
                    '0',
                    ''
                )
                // window.localStorage.getItem("isSender") && 
                if(res){
                    await checkResult(res);
                }
            }
                
        })();
        return ()=>{

        }
    },[props, props.history, props.location.search])

    // const handleDiscord = useCallback(()=>{
    //     window.open('https://discord.com/channels/','_self')
    // },[])

    return (
        <div className={'loading-box'}>
            <div className={'loading-content'}>
                <img src={load}/>
                <div className={'text'}>Loading…</div>
            </div>
        </div>

    );
}
