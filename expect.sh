#!/usr/bin/expect
set timeout 1
set arg1 [lindex $argv 0]
log_user 0
set hostName alt2.gmail-smtp-in.l.google.com
spawn telnet $hostName 25
expect "220 mx.google.com"
send "HELO\r"
expect "250 mx.google.com at your service"
send "MAIL FROM: <hren@sgoru.ru>\r"
expect "250 2.1.0 OK"
send "RCPT TO: <$arg1>\r"
log_user 1
expect -re {\r.*\r.*\r}
set output $expect_out(buffer)
send "QUIT\r"
