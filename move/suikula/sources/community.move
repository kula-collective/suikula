// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module suikula::community {
    use std::string::String;
    
    use sui::dynamic_field as df;
    const EInvalidPermission: u64 = 1;
    public struct AdminCap has key { id: UID }

    public struct GiftCap has key, store{ 
        id: UID,
        kula_id: ID
    }

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

        /// Represents a gift
    public struct Gift has key, store {
        id: UID,
        kula_id: ID,
        name: String,
        description: String,
    }

    /// Create a new Kula community
    public fun create_kula_community(
        name: String,
        ctx: &mut TxContext,
    ) {
        let kula = Kula {
            id: object::new(ctx),
            name
        };
        transfer::share_object(kula);
    }

    public fun register_member(kula: &mut Kula, recipient: address, ctx: &mut TxContext) {
        let member_id=kula.id.to_inner();
        transfer::transfer(GiftCap {
            id: object::new(ctx),
            kula_id: member_id
        }, recipient);
        df::add(&mut kula.id, recipient, recipient);
    }

    public fun create_gift(
        cap: &mut GiftCap, 
        kula: &mut Kula, 
        recipient: address,
        name: String,
        description: String, 
        ctx: &mut TxContext
    ){
        assert!(cap.kula_id == kula.id.to_inner(), EInvalidPermission);
        transfer::transfer(Gift {
            id: object::new(ctx),
            kula_id: cap.kula_id,
            name,
            description
        }, recipient);
    }
}
