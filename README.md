jquery.formValidate
===================

A simple, lightweight jQuery plugin for form validation. The plugin uses regular expresions and keywords to check forms
inputs and with CSS3 atributes you can style the failed inputs.

##Instalation
Include script after the jQuery library.
```
<script src="/path/to/jquery.cookie.js"></script>
```

##Usage

The plugin uses CSS 3 atributes to check what inputs are required and the data type to check in the inputs. 
To mark what inputs are required use this:
```
<input type="text" data-use="required" data-type="text" id="input1" placeholder="login">
```

The list of the data atributes used by the plugin are:
```
text text type, checks if there are alfanumeric characters
mail text type, checks the text for an email structure
pass text type,
date checks the string for a date structure "DD/MM/YYYY"
datemd checks the string for a date structure "MM/DD/YYYY"
difdate checks two linked date inputs for a one year diference.
equdate checks two linked date inputs for the same date.
```

```
$('#formid').formValidate();
```
With this you call the plugin to check the form inputs with regular expresions. The plugin comes with a set of regular
expresions for standard purposes -mail,text,password,dates- but you can add some of your own from plugin parameters like
this:

```
$('#formid').formValidate({code:/^expresion/});
```

Also it includes some key words for compare dates. With a structure like this ```difdat8yh``` the plugin checks
the dates for an 8 years difference and checks if the first one is the more recent.
