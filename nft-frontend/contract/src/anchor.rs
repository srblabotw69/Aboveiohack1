use crate::*;
  
pub trait Anchor {
  
    fn get_greeting() -> String;
    fn check_token(&self, account_id: AccountId ) -> bool;
    fn did_anchor(did: String) -> String;
    fn ricardian_anchor(ricardian_url: String) -> String;
}

#[near_bindgen]
impl Anchor for Contract {
 
    #[payable]
    fn get_greeting() -> String {
        return "helloworld".to_string();
    }

    // #[payable]
    fn check_token(&self, account_id: AccountId ) -> bool {
        let _nft_tokens_for_owner_array = self.nft_tokens_for_owner(account_id, None, None);
  
        if 1 == 1 {
            return true;
        } else {
            return false;
        }; 
    }

    #[payable]
    fn did_anchor(did: String) -> String {
        let hashed_input = env::sha256(did.as_bytes());
        let hashed_input_hex = hex::encode(&hashed_input);  
        return hashed_input_hex.to_string();
     }
    
     #[payable]
    fn ricardian_anchor(ricardian_url: String) -> String {
        let hashed_input = env::sha256(ricardian_url.as_bytes());
        let hashed_input_hex = hex::encode(&hashed_input);  
        return hashed_input_hex.to_string();
     }
}
