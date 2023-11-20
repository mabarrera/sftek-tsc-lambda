import * as AWS from 'aws-sdk';
import { APIGatewayProxyHandler } from "aws-lambda";

export const allPeople:APIGatewayProxyHandler = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const result = await dynamodb.scan({
      TableName: 'PeopleTable'
    }).promise();

    const people = result.Items;
    return {
      statusCode: 200,
      body: JSON.stringify( people )
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Server error' })
    }
  }
}