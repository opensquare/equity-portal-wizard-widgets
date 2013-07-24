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
	<div class="widget" name="common-user"></div>
</header>

<div class="widget" name="equity-banner" css="equity-banner.css"></div>

<section id="content">
    <article>
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
    </article>
    <article type="quote" subtype="search">
        <div class="widget" name="common-search" css="common-search.css" style="display:none"> </div>
        <div class="widget search-results" name="scp-quote-search-results" js="scp-quote-search-results.js" searchValue="!<%=brokerNumber%>" channel="quoteSearch" showUrl="broker-quote?ref="> </div>
        
        <!--div class="widget" name="scp-quote-search" filterIndex="0" filterString="<%=brokerNumber%>" showUrl="broker-quote?ref="/> </div-->
    </article>
</section>

<footer>
	<div class="widget" name="common-footer"></div>
</footer>