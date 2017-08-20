@echo off
setlocal EnableExtensions DisableDelayedExpansion

title antiDenjo

echo ##########################################
echo                  starting
echo ##########################################

IF EXIST %cd%\node_modules (
    goto checkConfig
) ELSE (
    CALL npm install
    goto checkConfig
)

:checkConfig
IF EXIST %cd%\dist\config.json (
    CALL npm run serve
) ELSE (
    CALL npm run build
    CALL node %cd%\dist\setup.js
    goto :checkConfig
)

pause
