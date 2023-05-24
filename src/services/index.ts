import { HttpRequest } from "../utils";

export class SocketApiService {
    httpRequest: HttpRequest;
    constructor() {
        this.httpRequest = new HttpRequest("https://api.socket.tech/v2/", {
            "Api-Key":
                "645b2c8c-5825-4930-baf3-d9b997fcd88c"
        })
    }

    getChains() {
        return this.httpRequest.get("supported/chains");
    }

    getFromTokensList(fromChainId, toChainId) {
        return this.httpRequest.get("token-lists/from-token-list", {
            fromChainId: fromChainId,
            toChainId: toChainId,
        });
    }

    getToTokensList(fromChainId, toChainId) {
        return this.httpRequest.get("token-lists/to-token-list", {
            fromChainId: fromChainId,
            toChainId: toChainId,
        });
    }

    getQuotes({ fromAmount, from, to, fromChainId, toChainId, fromTokenAddress, toTokenAddress }) {
        return this.httpRequest.get("quote", {
            fromChainId: fromChainId,
            toChainId: toChainId,
            fromAmount: fromAmount,
            userAddress: from,
            recipient: to,
            fromTokenAddress,
            toTokenAddress
        });
    }

    startRoute(route, fromChainId, toChainID, fromAssetAddress, toAssetAddress) {
        return this.httpRequest.post("route/start", {
            route,
            fromChainId: fromChainId,
            toChainId: toChainID,
            fromAssetAddress: fromAssetAddress,
            toAssetAddress: toAssetAddress,
            includeFirstTxDetails: true
        });
    }

    checkTxStatus(routeId, txIndex, txHash) {
        return this.httpRequest.get("route/prepare", {
            activeRouteId: routeId,
            userTxIndex: txIndex,
            txHash: txHash
        });
    }

    buildNextTx(routeId) {
        return this.httpRequest.get("route/build-next-tx", {
            activeRouteId: routeId
        });
    }

    getAllowance(chainId, owner, allowanceTarget, tokenAddress) {
        return this.httpRequest.get("approval/check-allowance", {
            chainID: chainId,
            owner: owner,
            allowanceTarget: allowanceTarget,
            tokenAddress: tokenAddress,
        });
    }

    getApprovalCallData(chainId, owner, allowanceTarget, tokenAddress, amount) {
        return this.httpRequest.get("approval/build-tx", {
            chainID: chainId,
            owner: owner,
            allowanceTarget: allowanceTarget,
            tokenAddress: tokenAddress,
            amount: amount
        });
    }
}