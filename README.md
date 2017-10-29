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
    secret-santa-mailer 'Guybrush<guybrush@monkeyisland.net>' 'Le Chuck<le-chuck@monkeyisland.net>' 'Elaine<elaine@monkeyisland.net>'
```

In dry-run mode:
```bash
    secret-santa-mailer -d 'Guybrush<guybrush@monkeyisland.net>' 'Le Chuck<le-chuck@monkeyisland.net>' 'Elaine<elaine@monkeyisland.net>'
```

More features to come
---------------------

- Exclude some participants when picking the santa of someone (no gift for a partner...)
