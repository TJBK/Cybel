@echo off
setlocal EnableExtensions DisableDelayedExpansion

title antiDenjo

echo ##########################################
echo                  starting
echo ##########################################

IF EXIST %cd%\node_modules (
    goto run
) ELSE (
    CALL npm install
    goto checkConfig
)

:run
CALL npm run start

pause
