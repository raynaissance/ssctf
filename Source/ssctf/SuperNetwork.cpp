#include "ssctf.h"
#include "SuperNetwork.h"
#include "easywsclient.hpp"
//#include <string.h>
#include <iostream>
#include <deque>

#include "AllowWindowsPlatformTypes.h"
#include <memory>
#include <thread>
#include "HideWindowsPlatformTypes.h"
#include "Array.h"
#include "UnrealString.h"
#include "Json.h"

using namespace std;
using easywsclient::WebSocket;

// TODO is static reqd?
deque<shared_ptr<string>> messageQueue;
deque<shared_ptr<string>> responseQueue;

// conversion method
string getString(FString str){
	wstring em1 = wstring(*str);
	return string(em1.begin(), em1.end());
}


void handle_message(const std::string & message) {
	cout << "received " << message.c_str() << endl;
	responseQueue.push_back(shared_ptr<string>(new string(message)));
}


int lock = 0;

void workerFunction(){
	cout << "Worker running" << endl;
	int i = 0;
	while (i++<5){
		WebSocket::pointer ws = WebSocket::from_url("ws://localhost:1338");
		if (ws == NULL){
			std::chrono::milliseconds dura(1000);
			std::this_thread::sleep_for(dura);
			continue;
		}
		cout << "web socket opened";
		while (ws->getReadyState() != WebSocket::CLOSED) {
			while (lock != 0);
			lock = 1;

			if (!messageQueue.empty()){
				/*
				if (messageQueue.size() > 100){
					deque<shared_ptr<string>> *tmp = new deque < shared_ptr<string> > ;
					messageQueue.swap(*tmp);
				}
				*/
				shared_ptr<string> message = messageQueue.front();
				if (message == NULL){
					messageQueue.clear();
				}
				else {
					cout << "sending " << message << endl;
					ws->send(*message);
					ws->poll();
					ws->dispatch(handle_message);
					messageQueue.pop_front();
				}
			}
			lock = 0; 
			std::chrono::milliseconds dura(200);
			std::this_thread::sleep_for(dura);
		}
		delete ws;
	}
	cout << "Worker done" << endl;
}

USuperNetwork::USuperNetwork(const class FPostConstructInitializeProperties& PCIP)
	: Super(PCIP)
{

}

int flag = 0;
void USuperNetwork::dispatch(AGameMode* gameMode, APlayerController* controller)
{
	if (controller == NULL) return;
	if (!flag) {
		GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("dispatch method called"));
		flag = 1;
	}
	while (!responseQueue.empty()) {
		GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("inside dispatch while loop"));
		shared_ptr<string> message = responseQueue.front();
		FString fmessage((*message).c_str());

		TSharedPtr<FJsonObject> JsonParsed;
		TSharedRef<TJsonReader<TCHAR>> JsonReader = TJsonReaderFactory<TCHAR>::Create(fmessage);
		if (FJsonSerializer::Deserialize(JsonReader, JsonParsed))
		{
			FString action = JsonParsed->GetStringField("action");
			FString status = JsonParsed->GetStringField("status");
			if (action == "login"){
				if (status != "error") {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("login success"));
					controller->ConsoleCommand(TEXT("ke * onLoginSuccess"));
				}
				else {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("login fail"));
					controller->ConsoleCommand(TEXT("ke * onLoginFail"));
				}
			}
			else if (action == "logout"){
				if (status != "error") {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("logout success"));
					controller->ConsoleCommand(TEXT("ke * onLogoutSuccess"));
				}
				else {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("logout fail"));
					controller->ConsoleCommand(TEXT("ke * onLogoutFail"));
				}
			}
			else if (action == "register"){
				if (status != "error") {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("register success"));
					controller->ConsoleCommand(TEXT("ke * onRegisterSuccess"));
				}
				else {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("register fail"));
					controller->ConsoleCommand(TEXT("ke * onRegisterFail"));
				}
			}
			else if (action == "unregister"){
				if (status != "error") {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("unregister success"));
					controller->ConsoleCommand(TEXT("ke * onUnRegisterSuccess"));
				}
				else {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("unregister fail"));
					controller->ConsoleCommand(TEXT("ke * onUnRegisterFail"));
				}
			}
			// TODO updateConnectedPlayers need a cb?
			else if (action == "list"){
				if (status != "error") {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Green, TEXT("list success"));
					controller->ConsoleCommand(TEXT("ke * clearList"));
					// get first?
					FJsonValueArray servers = JsonParsed->GetArrayField("servers");
					
					
					for (int i = 0; i < servers.AsArray().Num(); i++){
						TSharedPtr<FJsonObject> top = servers.AsArray()[i].Get()->AsObject();
						//FJsonObject top = JsonParsed->GetArrayField("servers").Top()->AsObject();

						GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Blue, (*top).GetStringField("name"));
						controller->ConsoleCommand(TEXT("ke * onListSuccess \"" + (*top).GetStringField("ip") + "\""));
					}
				}
				else {
					GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("list fail"));
					controller->ConsoleCommand(TEXT("ke * onListFail"));
				}
			}
		}

		responseQueue.pop_front();
	}
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
	while (lock != 0);
	lock = 1;

	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to login"));
	string strEmail = getString(email);
	string strPassword = getString(password);
	cout << "request to login as " << strEmail;

	//messageQueue.push_back("{\"action\":\"login\",\"email\":\"" + strEmail + "\",\"password\" : \"" + strPassword + "\"}");
	
	messageQueue.push_back(shared_ptr<string>(new string("{\"action\":\"login\",\"email\":\""+strEmail+"\",\"password\" : \""+strPassword+"\"}")));
	lock = 0;
}

//Register
void USuperNetwork::Register(FString map, FString port)
{
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to register"));
	string strMap = getString(map);
	string strPort = getString(port);
	messageQueue.push_back(shared_ptr<string>(new string("{\"action\":\"register\",\"map\":\"" + strMap + "\",\"port\":\"" + strPort + "\",\"connectedPlayers\":\"0\"}")));
}

void USuperNetwork::Logout(){
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to logout"));
	messageQueue.push_back(shared_ptr<string>(new string("{\"action\":\"logout\"}")));
}

void USuperNetwork::UnRegister(){
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to unregister"));
	messageQueue.push_back(shared_ptr<string>(new string("{\"action\":\"unregister\"}")));
}

void USuperNetwork::UpdateConnectedPlayers(FString connectedPlayers)
{
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to connectedPlayers"));
	string strConnectedPlayers = getString(connectedPlayers);
	messageQueue.push_back(shared_ptr<string>(new string("{\"action\":\"updateConnectedPlayers\",\"connectedPlayers\":\"" + strConnectedPlayers + "\"}")));
}

void USuperNetwork::List(){
	GEngine->AddOnScreenDebugMessage(-1, 5.f, FColor::Red, TEXT("request to list"));
	messageQueue.push_back(shared_ptr<string>(new string("{\"action\":\"list\"}")));
}