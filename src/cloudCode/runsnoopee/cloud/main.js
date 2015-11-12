Parse.Cloud.define("mailNewMessage", function(request, response) {

    var text = '';
    text += "Vous avez reçu un nouveau message de " + request.params.from.nickName + " : \n" + request.params.message;

    var html = "";
    html += "<html>";
    html += "";
    html += "<head>";
    html += "    <META http-equiv=\"Content-Type\" content=\"text\/html; charset=UTF-8\">";
    html += "<\/head>";
    html += "";
    html += "<body>";
    html += "    <div id=\"body_style\" style=\"padding-top: 20px; background-color: #e6eaed;\">";
    html += "        <table style=\"background-color: #888888; border: 1px solid #c9d6df; border-top-left-radius: 10px; border-top-right-radius: 10px; width: 670px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">";
    html += "            <tbody>";
    html += "                <tr>";
    html += "                    <td align=\"left\" valign=\"top\" width=\"67\">";
    html += "                        <div style=\"display: block;margin-right:10px;\" title=\"runsnoopee\" width=\"67\" height=\"72\" border=\"0\">";
    html += "";
    html += "                            <img style=\"display: block;margin:10px\" title=\"runsnoopee\" src=\"http:\/\/www.runsnoopee.com\/assets\/frontend\/onepage\/img\/logo\/blue.png\" alt=\"RunSnoopee\" border=\"0\">";
    html += "                        <\/div>";
    html += "";
    html += "                    <\/td>";
    html += "                    <td style=\"font-family: Arial, Helvetica, sans-serif; font-size: 14px;\" width=\"490\"><span><strong>" + request.params.to.firstName + ",<\/strong><\/span>";
    html += "                        <br> Vous avez re&ccedil;u un nouveau message.<\/td>";
    html += "                    <td style=\"font-family: Arial, Helvetica, sans-serif; font-size: 13px;\" width=\"110\">";
    html += "                    <\/td>";
    html += "                <\/tr>";
    html += "            <\/tbody>";
    html += "        <\/table>";
    html += "        <table style=\"border-right-width: 1px; border-right-color: #c9d6df; border-bottom-width: 1px; border-bottom-color: #c9d6df; border-left-width: 1px; border-left-color: #c9d6df; border-style: none solid solid; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; background-color: white; width: 670px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">";
    html += "            <tbody>";
    html += "                <tr>";
    html += "                    <td style=\"padding: 20px;\" width=\"668\">";
    html += "                        <table style=\"width: 628px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
    html += "                            <tbody>";
    html += "                                <tr>";
    html += "                                    <td class=\"vskHid\" style=\"padding-right: 15px;\" valign=\"top\" width=\"66\">&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<\/td>";
    html += "                                    <td valign=\"top\" width=\"100%\">";
    html += "                                        <table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
    html += "                                            <tbody>";
    html += "                                                <tr valign=\"top\">";
    html += "                                                    <td style=\"font-family: Arial, Helvetica, sans-serif; font-size: 14px;\">";
    html += "                                                        <p>";
    html += "                                                            <a style=\"font-size: 14px; color: #0a87cd; text-decoration: initial;\" href=\"#\">";
    html += "                                                                <strong>" + request.params.from.nickName + "<\/strong><\/a>";
    html += "                                                            <br>vous a envoy&eacute; un message&nbsp;:<\/p>";
    html += "                                                        <p>" + request.params.message + "<\/p>";
    html += "                                                        <table style=\"width: 100%;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
    html += "                                                            <tbody>";
    html += "                                                                <tr>";
    html += "                                                                    <td width=\"8%\">";
    html += "                                                                        <table class=\"vndCtaWidth\" style=\"border: 1px solid #ffbb02; background-color: #ffc906; border-top-left-radius: 5px; border-top-right-radius: 5px; border-bottom-right-radius: 5px; border-bottom-left-radius: 5px; width: 1px;\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
    html += "                                                                            <tbody>";
    html += "                                                                                <tr>";
    html += "                                                                                    <td style=\"background-attachment: scroll; white-space: nowrap; padding: 0px 20px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; background-position: 100% 0px; background-repeat: no-repeat no-repeat;\" bgcolor=\"#FFC906\" height=\"30\"><a style=\"text-decoration: initial; color: #000000 !important;\" href=\"http:\/\/app.runsnoopee.com\/#\/mails\" target=\"_blank\">Cliquez ici pour lui répondre<\/a><\/td>";
    html += "                                                                                <\/tr>";
    html += "                                                                            <\/tbody>";
    html += "                                                                        <\/table>";
    html += "                                                                    <\/td>";
    html += "                                                                    <td class=\"vskWpn\" style=\"font-size: 12px; padding: 0px 40px 0px 20px; white-space: nowrap;\" width=\"70%\">";
    html += "                                                                    <\/td>";
    html += "                                                                <\/tr>";
    html += "                                                            <\/tbody>";
    html += "                                                        <\/table>";
    html += "";
    html += "                                                    <\/td>";
    html += "                                                <\/tr>";
    html += "                                            <\/tbody>";
    html += "                                        <\/table>";
    html += "                                    <\/td>";
    html += "                                <\/tr>";
    html += "                            <\/tbody>";
    html += "                        <\/table>";
    html += "                    <\/td>";
    html += "                <\/tr>";
    html += "            <\/tbody>";
    html += "        <\/table>";
    html += "        <table class=\"vskHid\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">";
    html += "            <tbody>";
    html += "                <tr>";
    html += "                    <td width=\"670\"><img style=\"display: block;\" src=\"http:\/\/www.viadeo.com\/images\/partners\/mails\/shadow-bottom2.jpg\" alt=\"\" width=\"670\" height=\"24\" border=\"0\"><\/td>";
    html += "                <\/tr>";
    html += "            <\/tbody>";
    html += "        <\/table>";
    html += "    <\/div>";
    html += "<\/body>";
    html += "";
    html += "<\/html>";
    html += "";


    var Mandrill = require('mandrill');
    Mandrill.initialize(/* MANDRILL KEY HERE */);
    Mandrill.sendEmail({
        message: {
            text: text,
            html: html,
            subject: "Vous avez reçu un message sur RunSnoopee",
            from_email: "contact@runsnoopee.com",
            from_name: "RunSnoopee",
            to: [{
                email: request.params.to.email,
                name: "RunSnoopee"
            }]
        },
        async: true
    }, {
        success: function(httpResponse) {
            console.log(httpResponse);
            response.success("Email sent to " + request.params.to.email + ' from ' + request.params.from.nickName);
        },
        error: function(httpResponse) {
            console.error(httpResponse);
            response.error("Uh oh, something went wrong");
        }
    });
});
