package com.bbm384.badgateway.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;


@ConfigurationProperties(prefix = "cluster")
public class ClusterProperties {
    private String masterHost;
    private List<String> corsHosts;

    public ClusterProperties(){

    }

    public String getMasterHost() {
        return masterHost;
    }

    public void setMasterHost(String masterHost) {
        this.masterHost = masterHost;
    }

    public List<String> getCorsHosts() {
        return corsHosts;
    }

    public void setCorsHosts(List<String> corsHosts) {
        this.corsHosts = corsHosts;
    }
}
