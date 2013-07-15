<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" encoding="ISO-8859-1"/>
	<xsl:template match="/">
		<calcData xmlns="">
			<weight><xsl:value-of select="/quote/cover/weight"/></weight>
			<cover><xsl:value-of select="/quote/cover/cover"/></cover>
			<postcodePrefix><xsl:value-of select="substring(/quote/customer/address/postcode,1,2)"/></postcodePrefix>
			<vehicleAge><xsl:value-of select="/quote/cover/vehicleAge"/></vehicleAge>
			<drivers><xsl:value-of select="/quote/cover/drivers"/></drivers>
			<mainAge><xsl:value-of select="/quote/cover/mainAge"/></mainAge>
			<volXs><xsl:value-of select="/quote/cover/volxs"/></volXs>
			<ncdYears><xsl:value-of select="/quote/cover/ncdYears"/></ncdYears>
			<ncdProtect>
				<xsl:choose>
					<xsl:when test="/quote/cover/ncdProtect = 'true'">T</xsl:when>
					<xsl:otherwise>F</xsl:otherwise>
				</xsl:choose>
			</ncdProtect>
			<part partname="additionalData">
				<xsl:copy-of select="/quote/*[not(name()='calcRef')][not(name()='userType')]"/>
			</part>
		</calcData>
	</xsl:template>
</xsl:stylesheet>