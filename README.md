secret-santa-mailer
===================

A CLI tool, to send mails to participants, telling each one who they need to buy a gift for.


Features
--------

- Random and secret generation
- A participant cannot be told they have to buy a gift for themselves
- All participants are in a perfect loop (A -> B -> C -> D -> A)


Use
---

```bash
    npm i -g secret-santa-mailer
    secret-santa-mailer 'Guybrush<guybrush@monkeyisland.net>' 'Le Chuck<le-chuck@monkeyisland.net>' 'Elaine<elaine@monkeyisland.net>' -d
```

Options:
```
-d, --dry-run                   do not send mail and log result
-s, --subject <subject>         the mail subject
-H, --host <host>               host address for mail configuration
-P, --port <port>               port for mail configuration
-u, --auth-user <email>         auth user or email for mail configuration
-p, --auth-password <password>  auth password for mail configuration
-h, --help                      output usage information
```

More features to come
---------------------

- Exclude some participants when picking the santa of someone (no gift for a partner...)
