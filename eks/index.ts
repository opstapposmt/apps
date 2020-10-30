import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import * as eks from "@pulumi/eks";

// Get configuration for the stack
const config = new pulumi.Config();
const instanceType = config.get("instanceType") as aws.ec2.InstanceType;
const desiredCapacity = config.getNumber("desiredCapacity");

// Create an EKS cluster with the given configuration.
const cluster = new eks.Cluster("cluster", {
    instanceType: instanceType,
    desiredCapacity: desiredCapacity
});

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig;
