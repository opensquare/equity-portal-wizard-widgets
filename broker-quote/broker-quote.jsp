<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>
<%@ page import="com.osl.security.OslPrinciple" %>
<%@ page import="java.util.Map" %>

<%Subject user = SecurityUtils.getSubject();%>

<%
OslPrinciple oslPrinciple = (OslPrinciple)user.getPrincipals().oneByType(OslPrinciple.class);
Map<String, String> oslAttributes = oslPrinciple.getAtttributes();
String brokerNumber = oslAttributes.get("brokerNumber");
String calcRef = request.getParameter("ref");
%>

<header>
	<h2>Speak to us today <span>0800 123 456</span></h2>
	<div class="widget" name="username" css="username.css"></div>
</header>

<div class="widget" name="equity-banner" css="equity-banner.css"></div>

<section class="content">
	<div class="widget" name="quote-forms" data-params="ref=<%=calcRef%>&brokerNumber=<%=brokerNumber%>" css="quote-forms.css" js="quote-forms.js"></div>
</section>

<footer>
	<div class="widget" name="common-footer"></div>
</footer>