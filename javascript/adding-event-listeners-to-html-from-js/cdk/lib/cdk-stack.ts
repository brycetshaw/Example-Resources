import * as cdk from '@aws-cdk/core';
import { SPADeploy} from "cdk-spa-deploy";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // @ts-ignore
    new SPADeploy(this, "WebformDeploy")
        .createSiteWithCloudfront({indexDoc: 'index.html',
          websiteFolder: '../view'});

  }
}
