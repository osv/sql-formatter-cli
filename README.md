# Console util for formatting SQL using lib [sql-formatter](https://github.com/zeroturnaround/sql-formatter). Zero dependencies

---

## SYNOPSIS

    $ sql-formatter-cli -h
    SQL formatter

    Options:
      -i, --file  Load a file. "-" - stdin                                                                       [default: "-"]
      -s, --sql   Sql dialect: "sql" Standard SQL, "n1ql" Couchbase N1QL, "db2" IBM DB2, "pl/sql" Oracle PL/SQL  [default: "sql"]
      -o, --out   Output file name. "-" - stdout                                                                 [default: "-"]

    $ echo "SELECT * FROM databases WHERE category='NoSQL'" | sql-formatter-cli
    SELECT
      *
    FROM
      databases
    WHERE
      category = 'NoSQL'

## INSTALL

This tool require Node.js to be installed. After you can install using npm:

    npm i -g sql-formatter-cli

## THANKS

Many thanks to authors of [sql-formatter](https://github.com/zeroturnaround/sql-formatter) lib. I spent few hours for searching SQL query prettifier but most of them was awful or require JAVA/ruby (I failed to add "comma last" for anbt-sql-formatter).

The reason why I don't create PR for adding cli for sql-formatter lib is that sql-formatter use lodash dependency while I want to have minified version without any dependencies what is done by rollup :)

## EMACS SNIPPET

[Here](https://www.emacswiki.org/emacs/SqlBeautify) you can find more, but below is config that I use for formatting selected region.

```lisp
  (defun sql-beautify-region (beg end)
    "Beautify SQL in region between beg and END.
Dependency:
npm i -g sql-formatter-cli"
    (interactive "r")
    (save-excursion
      (shell-command-on-region beg end "sql-formatter-cli" nil t)))
  (defun sql-beautify-buffer ()
    "Beautify SQL in buffer."
    (interactive)
    (sql-beautify-region (point-min) (point-max)))
  (add-hook 'sql-mode-hook '(lambda ()
                              ;; beautify region or buffer
                              (local-set-key (kbd "C-c t") 'sql-beautify-region)))
```
