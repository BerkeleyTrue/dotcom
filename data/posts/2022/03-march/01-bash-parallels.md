---
title: Bash parallels
summary: Making bash jobs run in parallel
date: 2022-03-09T08:00:00.000Z
lastEdit: 2022-03-26T08:00:00.000Z
tags:
  - bash
---

Spent 2+ hours working on a function to sync my private notes Repos.
Actually getting the initial concept to work was quick, but then
I wanted to make it work in parallel, easy. But then I wanted to capture the
output and make it print out in serial. Not so easy.

Here is the my final solution:

```bash
notessync() {
  set +m
  declare -A outputs=()
  local msg="===-<output>-===\n"
  local dirs=(
    $HOME/docs/corpus
    $HOME/docs/notes/corpus
    $HOME/docs/notes/captainslog
  )

  echo "===-<starting>-==="
  for dir in ${dirs[@]}; do
    outputs[$dir]=$(mktemp /tmp/notessync.XXX)
    { run-job $dir 2 >&$outputs[$dir] &>1 & } 2>/dev/null
  done

  wait

  for dir in ${dirs[@]}; do
    msg+="$(cat $outputs[$dir])\n"
  done

  echo $msg
  set -m
}
```

### What did I learn?

* I need to store output to a file
  * This was done with a temp file (huray mktemp!)
    * `outputs[$dir]=$(mktemp /tmp/notessync.XXX)`
* I learned about associative arrays in bash
  * declare -A output=()
  * i.e. output["foo"]="bar"
* How to capture the output with >&
  * i.e. echo "foo" >&/tmp/some/file 2>&1
  * the end bit pipes stderr to stdout which is piped by >& to the tmp file
* I need to set +m (disables job control?)
  * with that disabled, it removes some output about currently running background tasks
* use `wait` to wait for background tasks to complete before ending function
* then fold outputs back into msg and print out


### Remaining Questions

I use a bash [formatter][shfmt]. One weird thing I noticed is that the formatter
would re-arrange the order of things

```bash
# from
run-job $dir >&$outputs[$dir] 2&>1
# to
run-job $dir 2 >&$outputs[$dir] &>1
```
Not sure what that's about but it doesn't seem to change the outcome. 🤷

#### Edit - 03-26-2022

Ok, I sometimes I'm and idiot and sometimes my dyslexia sneaks one by.

The above re-arranging was do to a syntax error. It should be

```bash
run-job $dir >&$outputs[$dir] 2>&1
```

Also, `>& some-file` is equivalent to `> some-file 2>&1`. So the last
redirect is not required.

On top of that, the preferred syntax is `&>some-file`. The result:

```bash
run-job $dir &>$outputs[$dir]
```

I read it as apply run-job to `$dir`, store `stdout` to `$outputs[$dir]` and redirect
stderr to stdout


I've left the original script above with the mentioned errors, but below is the
script with the issues resolved.

```bash
notessync() {
  set +m
  declare -A outputs=()
  local msg="===-<output>-===\n"
  local dirs=(
    $HOME/docs/corpus
    $HOME/docs/notes/corpus
    $HOME/docs/notes/captainslog
  )

  echo "===-<starting>-==="
  for dir in ${dirs[@]}; do
    outputs[$dir]=$(mktemp /tmp/notessync.XXX)
    { run-job $dir &>$outputs[$dir] & } 2>/dev/null
  done

  wait

  for dir in ${dirs[@]}; do
    msg+="$(cat $outputs[$dir])\n"
  done

  echo $msg
  set -m
}
```

[shfmt]: https://github.com/patrickvane/shfmt
