# ivrswitchboardAPI
M.Sc. in Computing Assignment 2 


## API 

| Resource                       | Auth |     GET            |    POST    |   PATCH              |   DELETE        |
| ------------------------------ | ---- | ------------------ | ---------- | -------------------- |---------------- |
| /api/e164?cc=353&ndc=818       |  N   | find 20 numbers    |            |                      |                 |
| /api/auth                      |  N   |                    | jwt (login)|                      |                 |
| /api/account?action=register   |  N   |                    | sign up    |                      |                 |
| /api/account                   |  Y   | read account       |            | update account*NOT IM| close account   |
| /api/switchboard               |  Y   | read switchboard   |            | update switchboard   |                 |
| /api/recording/:index          |  Y   | stream             | upload     |                      |                 |
| /api/paymethod       *NOT IMPL.|  Y   | read cc/pay inf.   |            | update cc/pay  info. |                 |
| /api/billing         *NOT IMPL.|  Y   | read billing inf.  |            | update billing info. |                 |



