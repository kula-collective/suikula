// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module suikula::community {
    use std::string::String;
    
    use sui::dynamic_field as df;

    public struct AdminCap has key { id: UID }

    public struct GiftCap has key { id: UID }

    fun init(ctx: &mut TxContext) {
        transfer::transfer(AdminCap {
            id: object::new(ctx)
        }, ctx.sender())
    }
    /// Kula
    public struct Kula has key, store {
        id: UID,
        name: String
    }

    /// Create a new Kula community
    public fun create_kula_community(
        name: String,
        ctx: &mut TxContext,
    ) {
        let db = Kula {
            id: object::new(ctx),
            name
        };
        transfer::share_object(db);
    }

    public fun register_member(_: &AdminCap, db: &mut Kula, service_id: ID, recipient: address, ctx: &mut TxContext) {
        transfer::transfer(GiftCap {
            id: object::new(ctx)
        }, recipient);
        df::add(&mut db.id, service_id, service_id);
    }
}
