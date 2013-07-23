<%@ page import="org.apache.shiro.SecurityUtils" %>
<%@ page import="org.apache.shiro.subject.Subject" %>
<%@ page import="com.osl.security.OslPrinciple" %>
<%@ page import="java.util.Map" %>

<%Subject user = SecurityUtils.getSubject();%>

<%
OslPrinciple oslPrinciple = (OslPrinciple)user.getPrincipals().oneByType(OslPrinciple.class);
Map<String, String> oslAttributes = oslPrinciple.getAtttributes();
String brokerNumber = oslAttributes.get("brokerNumber");
%>

<header>
	<h2>Speak to us today <span>0800 123 456</span></h2>
	<div class="widget" name="username" css="username.css"></div>
</header>

<div class="widget" name="equity-banner" css="equity-banner.css"></div>

<section id="cp-content">
    <div class="new-square-group">
        <%if (user.isPermitted("rq.Haulage")) {%>
        <a class="new-square" href="broker-quote" type="quote" subtype="new">New Haulage Quote</a>
        <%}%>
        <%if (user.isPermitted("rq.Main Fleet")) {%>
        <a class="new-square" href="under-construction" type="quote" subtype="new">New Main Fleet Quote</a>
        <%}%>
        <%if (user.isPermitted("rq.Mini Fleet")) {%>
        <a class="new-square" href="under-construction" type="quote" subtype="new">New Mini Fleet Quote</a>
        <%}%>
    </div>
    <div class="widget" name="scp-quote-search" filterIndex="0" filterString="<%=brokerNumber%>"/> </div>
</section>

<footer>
	<div class="widget" name="common-footer"></div>
</footer>