---
title: Taskwarrior Sync
summary: Syncing Taskwarrior across servers
date: 2022-06-23T08:00:00.000Z
tags:
  - taskwarrior
lastEdit: '2022-06-23T18:29:01.211Z'

---

I use Taskwarrior to keep track of my todos for long term projects as well as
daily tasks. While I love Taskwarrior, there are often times where I'm away
from my computer and would like to add a todo.

After some research, I found [InThe.Am][intheam] which is an open source project
which serves as a syncing server for Taskwarrior, and [Foreground][Foreground],
which is an open source project offering a pretty good mobile interface for
Taskwarrior.

One thing I found lacking was documentation on sync back and forth with my
desktop. So I put some bash scripts together.

First, we create an account on [InThe.Am][intheam]. Through their dashboard you
will be able to download PEM certs. You'll need to put these somewhere you can
find on your desktop. I put them in `/etc/ssl/certs/intheam/`. There should be
three files, a `private.certificate.pem`, `private.key.pem`, and `ca.cert.pem`.
You'll also need to add to your taskrc file a couple of lines pointing to these
files as well as a credentials line. Note, if you use git to track your RC file
like I do, you'll need to make sure these values are not shared publicly, as
the pem files are used by [InThe.Am][intheam] to authenticate an http request,
but they don't authenticate you with your account, that is what the credentials
field is for. Keep this private. I accomplished this by using `include $HOME/.config/task/taskserverrc`
in my taskrc and making sure the taskserverrc file is ignored by git. In the
taskserverrc file, we add:

```config
taskd.certificate=/path/to/private.certificate.pem
taskd.key=/path/to/private.key.pem
taskd.ca=/path/to/ca.cert.pem
taskd.server=inthe.am:53589
taskd.credentials=inthe_am/<username>/<uuid>
taskd.trust=strict
```

Now you should be able to hit `task sync` and see a `sync successful`.

I want to trigger a sync after every edit on my desktop. This is done
using Taskwarriors hooks system and a bash script.

We create a file under `~/.config/task/hooks/on-exit.sync`. This file
will then be called by Taskwarrior cli after every edit but before exiting.
The most basic script just needs to call task sync

```bash
#!/bin/sh
task sync
```

To make it spicy, we can create a log to debug issues:

```bash
#!/bin/sh
TASK_SHARE=~/.local/share/task
SYNC_LOG=$TASK_SHARE/on-exit-sync-hook.log

output=$(task sync)
echo "$(date "+\%F \%T") - $output" >>$SYNC_LOG 2>&1

exit 0
```

We can also make sure we only sync if there is something to sync:

```bash
…
TASK_BACKLOG=~/.config/task/backlog.data

# Only sync, if the backlog is not empty
if (($(cat $TASK_BACKLOG | wc -l) > 1)); then
  output=$(task sync)
  echo "$(date "+\%F \%T") - $output" >>$SYNC_LOG 2>&1
fi
…
```

Later, we'll be adding a cron job to sync every so often just in case we make
changes from the app. We'll add a lock file to make sure we are not syncing
while the cron job is running.

```bash
...
LOCK_FILE=$TASK_SHARE/SYNC.lock

# create lock file if it doesn't exist, pipe errors to /dev/null
2>/dev/null >$LOCK_FILE

# trap on exit to remove lockfile
trap 'rm -f "$LOCK_FILE"' EXIT
…
```

Putting those together and with some bash checks we get:

```bash
#!/bin/sh
TASK_BACKLOG=~/.config/task/backlog.data
TASK_SHARE=~/.local/share/task
SYNC_LOG=$TASK_SHARE/on-exit-sync-hook.log
LOCK_FILE=$TASK_SHARE/SYNC.lock

if {
  # set C ensures redirect cannot overwrite a file.
  set -C
  # create lock file if it doesn't exist, pipe errors to /dev/null
  2>/dev/null >$LOCK_FILE
}; then
  # trap on exit to remove lockfile
  trap 'rm -f "$LOCK_FILE"' EXIT

  # Only sync, if the backlog is not empty
  if (($(cat $TASK_BACKLOG | wc -l) > 1)); then
    output=$(task sync)
    echo "$(date "+\%F \%T") - $output" >>$SYNC_LOG 2>&1
  fi
fi

exit 0
```

The cron job will be very similar except we don't want to check the backlog on
the local machine. I put this file under
`~/.config/task/scripts/cron-update.sh`.

```bash
#!/bin/sh
TASK_BACKLOG=~/.config/task/backlog.data
TASK_SHARE=~/.local/share/task
SYNC_LOG=$TASK_SHARE/cron-update.log
LOCK_FILE=$TASK_SHARE/SYNC.lock

if {
  # set C ensures redirect cannot overwrite a file.
  set -C
  # create lock file if it doesn't exist, pipe errors to /dev/null
  2>/dev/null >$LOCK_FILE
}; then
  # trap on exit to remove lockfile
  trap 'rm -f "$LOCK_FILE"' EXIT

  output=$(task sync)
  echo "$(date "+\%F \%T") - $output" >>$SYNC_LOG 2>&1
fi
exit
```

Finally, we add the cron job using `crontab -e` to run every hour.

```cron
0 * * * * /home/berkeleytrue/.config/task/scripts/cron-update.sh
```

And that's it. You should be syncing with [InThe.Am][intheam].

To get Foreground to sync is pretty straight forward. You'll need to put the
same pem certs on your phone somewhere and through the app interface you can
link the certs and set up how often you want to sync.

[intheam]: https://github.com/coddingtonbear/inthe.am

[Foreground]: https://github.com/bgregos/foreground
