@echo off
setlocal

cd /d %~dp0..\..

REM Clean previous results
rmdir /s /q allure-results
mkdir allure-results

set TAG=%1
IF "%TAG%"=="" set TAG=@search_product

echo Running Chrome tests...
call npx cucumber-js "tests/features/*.feature" --require "tests/steps/*.js" --require "tests/hooks/*.js" --profile chrome --tags "%TAG%"

echo Running Firefox tests...
call npx cucumber-js "tests/features/*.feature" --require "tests/steps/*.js" --require "tests/hooks/*.js" --profile firefox --tags "%TAG%"

echo Running Edge tests...
call npx cucumber-js "tests/features/*.feature" --require "tests/steps/*.js" --require "tests/hooks/*.js" --profile edge --tags "%TAG%"

echo Generating Allure Report...
call npm run report:allure

echo Test execution complete.