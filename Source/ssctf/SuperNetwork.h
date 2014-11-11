

#pragma once

#include "Kismet/BlueprintFunctionLibrary.h"
#include "SuperNetwork.generated.h"

/**
 * 
 */
UCLASS()
class SSCTF_API USuperNetwork : public UBlueprintFunctionLibrary
{
	GENERATED_UCLASS_BODY()

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
	static FString GetHappyMessage();

	UFUNCTION(BlueprintCallable, Category = "SuperNetwork")
		static void Register();
};
