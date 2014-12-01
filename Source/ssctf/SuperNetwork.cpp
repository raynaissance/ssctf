#include "ssctf.h"
#include "SuperNetwork.h"
#include "easywsclient.hpp"
//#include <string.h>
#include <iostream>
#include <deque>

#include "AllowWindowsPlatformTypes.h"
#include <thread>
#include "HideWindowsPlatformTypes.h"
#include "Array.h"
#include "UnrealString.h"

using namespace std;
using easywsclient::WebSocket;

// conversion method
string getString(FString str){
	wstring em1 = wstring(*str);
	return string(em1.begin(), em1.end());
}

void handle_message(const std::string & message) {
	cout << "received " << message.c_str() << endl;
	//if (message == "world") { ws->close(); }
}

// TODO is static reqd?
deque<string> messageQueue;

void workerFunction(){
	cout << "Worker running" << endl;

	WebSocket::pointer ws = WebSocket::from_url("ws://localhost:1338");
	//assert(ws);
	cout << "web socket opened";
	while (ws->getReadyState() != WebSocket::CLOSED) {
		if (messageQueue.empty())
			continue;
		string message = messageQueue.front();
		cout << "sending " << message << endl;
		ws->send(message);
		ws->poll();
		ws->dispatch(handle_message);
		messageQueue.pop_front();
	}
	delete ws;

	cout << "Worker done" << endl;
}

USuperNetwork::USuperNetwork(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{
	
}


void USuperNetwork::Connect()
{
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to connect"));
	cout << "Start" << endl;

	thread workerThread(workerFunction);
	cout << "Waiting for thread" << endl;

	workerThread.detach();

	cout << "Main done" << endl;
}



void USuperNetwork::Login(FString email, FString password){
	//	gameserver@superspeed.edu
	//  123
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to login"));
	string strEmail = getString(email);
	string strPassword = getString(password);
	cout << "request to login as " << strEmail;

	messageQueue.push_back("{\"action\":\"login\",\"email\":\"" + strEmail + "\",\"password\" : \"" + strPassword + "\"}");
}

//Register
void USuperNetwork::Register(FString map, FString port)
{
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to register"));
	string strMap = getString(map);
	string strPort = getString(port);
	messageQueue.push_back("{\"action\":\"register\",\"map\":\"" + strMap + "\",\"port\":\"" + strPort + "\",\"connectedPlayers\":\"0\"}");
}

void USuperNetwork::Logout(){
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to logout"));
	messageQueue.push_back("{\"action\":\"logout\"}");
}

void USuperNetwork::UnRegister(){
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to unregister"));
	messageQueue.push_back("{\"action\":\"unregister\"}");
}

void USuperNetwork::UpdateConnectedPlayers(FString connectedPlayers)
{
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to connectedPlayers"));
	string strConnectedPlayers = getString(connectedPlayers);
	messageQueue.push_back("{\"action\":\"updateConnectedPlayers\",\"connectedPlayers\":\"" + strConnectedPlayers + "\"}");
}

void USuperNetwork::List(){
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to list"));
	messageQueue.push_back("{\"action\":\"list\"}");
}
