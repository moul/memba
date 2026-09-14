import type { Page } from '@playwright/test'
import { fulfillOnchainReads, mockChainStatus } from './onchain'

/** Test-only deterministic roster, never imported by application source. */
export async function fulfillProValidatorRoster(page: Page) {
    const validator = (n: number, power: string) => ({
        address: `g1mockval000000000000000000000000000000${n}`,
        pub_key: { '@type': '/tm.PubKeyEd25519', value: `bW9ja3B1YmtleTAwMDAwMDAwMDAwMDAwMDAwMDA${n}=` },
        voting_power: power,
        proposer_priority: '0',
    })
    const VALIDATORS = {
        block_height: '435604',
        validators: [validator(1, '30'), validator(2, '20'), validator(3, '10')],
    }
    const now = Date.now()
    const STATUS = { ...mockChainStatus(), sync_info: { latest_block_height: '435604', latest_block_time: new Date(now).toISOString(), catching_up: false } }
    const BLOCK = {
        block: {
            header: { chain_id: 'e2e-offline', height: '435594', time: new Date(now - 40_000).toISOString() },
            // tm2 commits carry `precommits`, not `signatures`.
            last_commit: {
                precommits: [1, 2, 3].map(n => ({
                    type: 2,
                    height: '435593',
                    round: '0',
                    validator_address: `g1mockval000000000000000000000000000000${n}`,
                    validator_index: String(n - 1),
                    timestamp: '2026-07-30T11:59:40.000Z',
                })),
            },
        },
    }
    const NET_INFO = {
        listening: true,
        listeners: ['Listener(@)'],
        n_peers: '1',
        peers: [{
            node_info: {
                net_address: 'g1mockpeer0000000000000000000000000000001@203.0.113.7:26656',
                network: 'e2e-offline',
                moniker: 'e2e-peer-01',
                other: { tx_index: 'off', rpc_address: 'tcp://203.0.113.7:26657' },
            },
            is_outbound: false,
            remote_ip: '203.0.113.7',
        }],
    }

    await page.route(/monitoring\.gnolove\.world/, route => {
        const path = new URL(route.request().url()).pathname.toLowerCase()
        const rows = [1, 2, 3].map(n => ({
            addr: `g1mockval000000000000000000000000000000${n}`,
            moniker: ['Northstar', 'Harbor collective', 'Cedar infrastructure'][n - 1],
            participationRate: 99.9, uptime: 99.9, operationTime: 32,
            missedBlocks: n, txContrib: 33.3,
        }))
        return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(path.includes('incident') || path.includes('first_seen') ? [] : rows) })
    })
    await fulfillOnchainReads(page, ({ method }) => {
        if (method === 'validators') return VALIDATORS
        if (method === 'status') return STATUS
        if (method === 'block') return BLOCK
        if (method === 'net_info') return NET_INFO
        return null
    })
}
