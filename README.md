# ivrswitchboardAPI
M.Sc. in Computing Assignment 2 


## API 

| Resource                       | Auth |     GET            |    POST    |   PATCH              |   DELETE        |
| ------------------------------ | ---- | ------------------ | ---------- | -------------------- |---------------- |
| /api/e164?cc=353&818           |  N   | find 20 numbers    |            |                      |                 |
| /api/auth                      |  N   |                    | jwt (login)|                      |                 |
| /api/account?action=register   |  N   |                    | sign up    |                      |                 |
| /api/account                   |  Y   | read account       |            | update account       | close account   |
| /api/switchboard               |  Y   | read switchboard   |            | update switchboard   |                 |
| /api/recording                 |  Y   | /:fileName stream  | upload     |                      |                 |
| /api/paymethod                 |  Y   | read cc/pay inf.   |            | update cc/pay  info. |                 |
| /api/billing                   |  Y   | read billing inf.  |            | update billing info. |                 |



